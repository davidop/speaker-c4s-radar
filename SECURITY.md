# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in speaker-c4s-radar, please **do not report it publicly in GitHub Issues**.

### How to Report

1. Go to the **Security** tab → **Private vulnerability reporting**
2. Click **Report a vulnerability**
3. Describe the security issue with:
   - Clear description of the vulnerability
      - Steps to reproduce (if applicable)
         - Potential impact
            - Affected version (if applicable)

            The maintainers will respond within 48 hours.

            ## Supported Versions

            Security updates are provided for:

            | Version | Support |
            |---------|----------|
            | Latest | ✅ Actively supported |
            | Previous | 🔄 Security patches if critical |
            | Older | ❌ No support |

            ## Disclosure Policy

            We follow responsible disclosure practices:

            1. **Initial Response**: We will acknowledge receipt of your report within 48 hours
            2. **Assessment**: We will work to understand and reproduce the issue
            3. **Notification**: Once confirmed, we will:
               - Develop and test a fix
                  - Coordinate with you on the disclosure timeline (typically 90 days)
                     - Prepare a security advisory
                     4. **Publication**: After a fix is released and deployed, we will:
                        - Publish a security advisory on GitHub
                           - Credit you (if you wish)
                              - Add details to CHANGELOG.md

                              ## Security Features

                              This repository maintains security through:

                              - ✅ **Dependabot Alerts**: Automated dependency vulnerability scanning
                              - ✅ **Secret Scanning**: Detection of credentials accidentally committed
                              - ✅ **Code Scanning**: Automated code analysis with CodeQL
                              - ✅ **Branch Protection**: Required reviews for all changes to main
                              - ✅ **2FA Requirements**: For maintainers

                              ## Out of Scope

                              The following are NOT considered security vulnerabilities:

                              - Social engineering attacks
                              - Physical security issues
                              - Rate limiting / DDoS
                              - Spam or harassment
                              - Vulnerabilities requiring user interaction on non-vulnerable systems

                              ## Credits

                              We appreciate security researchers who responsibly disclose vulnerabilities. Researchers will be credited in the security advisory and CHANGELOG (unless they prefer anonymity).

                              ## Questions?

                              For security-related questions, please use private vulnerability reporting rather than public Issues.

                              ---

                              **Last updated**: May 2026
