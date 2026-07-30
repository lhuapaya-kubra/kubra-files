"""
KUBRA Datafeed API File Upload Script

This script handles:
1. Retrieving a machine token for authentication
2. Uploading files to the KUBRA Datafeed API

Usage:
    python kubra_upload.py <file_path> [--config config.json] [--metatags key1=value1 key2=value2]

Examples:
    python kubra_upload.py data.json
    python kubra_upload.py balances.csv --config production_config.json
    python kubra_upload.py data.json --metatags source=system1 batch=morning
"""

import argparse
import json
import os
import sys
from pathlib import Path

import requests


def load_config(config_path: str) -> dict:
    """Load configuration from JSON file."""
    config_file = Path(config_path)
    
    if not config_file.exists():
        print(f"Error: Configuration file '{config_path}' not found.")
        print("Please create a config.json file based on config.example.json")
        sys.exit(1)
    
    with open(config_file, 'r') as f:
        return json.load(f)


def get_machine_token(config: dict) -> str:
    """
    Retrieve a machine token from KUBRA's authentication API.
    
    Uses the Datafeed v3 authorization endpoint.
    The token is required for all Datafeed API calls.
    """
    token_url = config.get('token_url', 'https://api.kubra.io/authentication/api/v2/token')
    
    payload = {
        'client_id': config['client_id'],
        'client_secret': config['client_secret'],
        'grant_type': 'client_credentials'
    }
    
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    print("Requesting machine token...")
    
    try:
        response = requests.post(token_url, data=payload, headers=headers)
        response.raise_for_status()
        
        token_data = response.json()
        access_token = token_data.get('access_token')
        
        if not access_token:
            print("Error: No access_token in response")
            print(f"Response: {token_data}")
            sys.exit(1)
        
        print("Successfully obtained machine token.")
        return access_token
        
    except requests.exceptions.HTTPError as e:
        print(f"Error obtaining token: {e}")
        print(f"Response: {response.text}")
        sys.exit(1)
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        sys.exit(1)


def upload_file(config: dict, file_path: str, token: str, metatags: dict = None) -> dict:
    """
    Upload a file to the KUBRA Datafeed API.
    
    Args:
        config: Configuration dictionary with API settings
        file_path: Path to the file to upload
        token: Machine access token
        metatags: Optional dictionary of metatag key-value pairs
    
    Returns:
        API response as dictionary
    """
    file_to_upload = Path(file_path)
    
    if not file_to_upload.exists():
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)
    
    # Build the upload URL
    api_base = config.get('api_base_url', 'https://api.kubra.io/datafeed/v3')
    datafeed_type = config.get('datafeed_type', 'balanceFeeds')
    space_krn = config['space_krn']
    
    upload_url = f"{api_base}/{datafeed_type}/{space_krn}/files"
    
    # Build headers
    headers = {
        'kubra-clientid': config['client_id'],
        'kubra-realm': config.get('realm', 'sandbox'),
        'Authorization': f'Bearer {token}'
    }
    
    # Add optional metatags
    if metatags:
        for key, value in metatags.items():
            # Validate metatag constraints
            if len(key) > 24:
                print(f"Warning: Metatag key '{key}' exceeds 24 characters, skipping.")
                continue
            if len(value) > 128:
                print(f"Warning: Metatag value for '{key}' exceeds 128 characters, skipping.")
                continue
            headers[f'kubra-metatag-{key}'] = value
    
    # Prepare the file for multipart upload
    file_name = file_to_upload.name
    
    # Determine content type based on file extension
    content_type_map = {
        '.json': 'application/json',
        '.csv': 'text/csv',
        '.xml': 'application/xml',
        '.txt': 'text/plain'
    }
    content_type = content_type_map.get(file_to_upload.suffix.lower(), 'application/octet-stream')
    
    print(f"Uploading file: {file_name}")
    print(f"  Datafeed type: {datafeed_type}")
    print(f"  Space KRN: {space_krn}")
    print(f"  Realm: {config.get('realm', 'sandbox')}")
    print(f"  Content type: {content_type}")
    
    try:
        with open(file_to_upload, 'rb') as f:
            files = {
                'file': (file_name, f, content_type)
            }
            
            response = requests.post(upload_url, headers=headers, files=files)
            response.raise_for_status()
            
            print(f"\nUpload successful! Status code: {response.status_code}")
            
            try:
                result = response.json()
                print(f"Response: {json.dumps(result, indent=2)}")
                return result
            except json.JSONDecodeError:
                print(f"Response: {response.text}")
                return {'status': 'success', 'message': response.text}
                
    except requests.exceptions.HTTPError as e:
        print(f"\nUpload failed! Status code: {response.status_code}")
        print(f"Error: {e}")
        print(f"Response: {response.text}")
        sys.exit(1)
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        sys.exit(1)


def parse_metatags(metatag_args: list) -> dict:
    """Parse metatag arguments in key=value format."""
    metatags = {}
    if metatag_args:
        for item in metatag_args:
            if '=' in item:
                key, value = item.split('=', 1)
                metatags[key] = value
            else:
                print(f"Warning: Invalid metatag format '{item}', expected key=value")
    return metatags


def main():
    parser = argparse.ArgumentParser(
        description='Upload files to KUBRA Datafeed API',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  python kubra_upload.py data.json
  python kubra_upload.py balances.csv --config production.json
  python kubra_upload.py data.json --metatags source=system1 batch=morning
  python kubra_upload.py invoices.json --datafeed invoiceFeeds
        '''
    )
    
    parser.add_argument(
        'file',
        help='Path to the file to upload'
    )
    
    parser.add_argument(
        '--config', '-c',
        default='config.json',
        help='Path to configuration file (default: config.json)'
    )
    
    parser.add_argument(
        '--metatags', '-m',
        nargs='*',
        help='Optional metatags in key=value format'
    )
    
    parser.add_argument(
        '--datafeed', '-d',
        help='Override datafeed type from config (e.g., balanceFeeds, invoiceFeeds, accountFeeds)'
    )
    
    parser.add_argument(
        '--realm', '-r',
        choices=['sandbox', 'live'],
        help='Override realm from config'
    )
    
    args = parser.parse_args()
    
    # Load configuration
    config = load_config(args.config)
    
    # Apply command-line overrides
    if args.datafeed:
        config['datafeed_type'] = args.datafeed
    if args.realm:
        config['realm'] = args.realm
    
    # Parse metatags
    metatags = parse_metatags(args.metatags)
    
    # Get machine token
    token = get_machine_token(config)
    
    # Upload the file
    upload_file(config, args.file, token, metatags)
    
    print("\nDone!")


if __name__ == '__main__':
    main()
