# KUBRA Datafeed API File Upload

This tool uploads files to the KUBRA Datafeed API for processing balances, accounts, invoices, and other data.

## Prerequisites

1. **Python 3.7+** installed on your system
2. **KUBRA Credentials** from your KUBRA Service Delivery Team:
   - Client ID (UUID)
   - Client Secret
   - Space KRN (e.g., `krn:spc:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## Setup

### 1. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 2. Configure Credentials

Copy the example config file and fill in your credentials:

```powershell
copy config.example.json config.json
```

Edit `config.json` with your actual credentials:

```json
{
    "client_id": "your-actual-client-id",
    "client_secret": "your-actual-client-secret",
    "space_krn": "krn:spc:your-actual-space-krn",
    "realm": "sandbox",
    "datafeed_type": "balanceFeeds",
    "token_url": "https://api.kubra.io/authentication/api/v2/token",
    "api_base_url": "https://api.kubra.io/datafeed/v3"
}
```

**Configuration Fields:**

| Field | Description |
|-------|-------------|
| `client_id` | Your KUBRA client ID (UUID format) |
| `client_secret` | Your client secret for authentication |
| `space_krn` | Your space KRN (must start with `krn:spc:`) |
| `realm` | Environment: `sandbox` for testing, `live` for production |
| `datafeed_type` | Type of datafeed: `balanceFeeds`, `accountFeeds`, `invoiceFeeds`, etc. |

## Usage

### Basic Upload

```powershell
python kubra_upload.py your_data_file.json
```

### With Custom Config

```powershell
python kubra_upload.py data.csv --config production_config.json
```

### With Metatags

```powershell
python kubra_upload.py data.json --metatags source=erp batch=daily
```

### Override Datafeed Type

```powershell
python kubra_upload.py invoices.json --datafeed invoiceFeeds
```

### Switch to Live Environment

```powershell
python kubra_upload.py data.json --realm live
```

## Command Line Options

| Option | Description |
|--------|-------------|
| `file` | Path to the file to upload (required) |
| `--config, -c` | Path to configuration file (default: `config.json`) |
| `--metatags, -m` | Optional metatags in `key=value` format |
| `--datafeed, -d` | Override datafeed type from config |
| `--realm, -r` | Override realm (`sandbox` or `live`) |

## Supported File Types

- `.json` - JSON data files
- `.csv` - CSV data files
- `.xml` - XML data files
- `.txt` - Plain text files

## API Response

A successful upload returns HTTP 200 with the uploaded file name. Files are automatically processed by downstream KUBRA services (accounts, balances, invoices, etc.).

## Troubleshooting

### 401 Unauthorized
- Verify your `client_id` and `client_secret` are correct
- Ensure your credentials haven't expired

### 404 Not Found
- Check that your `space_krn` is correct and starts with `krn:spc:`
- Verify the `datafeed_type` matches an existing datafeed

### 400 Bad Request
- Ensure your file format matches the expected schema
- Check that metatag keys are ≤24 characters and values ≤128 characters

## Security Notes

- **Never commit `config.json`** to version control (it's in `.gitignore`)
- Use `config.example.json` as a template
- Store credentials securely and rotate them regularly
