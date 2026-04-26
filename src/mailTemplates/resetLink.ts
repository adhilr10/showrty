export const resetLinkTemplate = (resetToken: string) => `
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <div
    style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
  >
    Password Reset
  </div>
  <body style="background-color:#fff;color:#212121">
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:37.5em;padding:20px;margin:0 auto;background-color:#eee"
    >
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background-color:#fff"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="background-color:#252f3d;display:flex;padding:20px 0;align-items:center;justify-content:center"
                    >
                      <tbody>
                        <tr>
                          <td>
                           IPOS
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding:25px 35px"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <h1
                              style="color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-size:20px;font-weight:bold;margin-bottom:15px"
                            >
                              Reset your password
                            </h1>
                            <p
                              style="font-size:14px;line-height:24px;margin:24px 0;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;margin-bottom:14px"
                            >
                              We received a request to reset your password for your account associated with this email address. If you made this request, click the button below to reset your password.
                            </p>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="display:flex;align-items:center;justify-content:center"
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <p
                                      style="font-size:14px;line-height:24px;margin:0;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-weight:bold;text-align:center"
                                    >
                                      Reset link
                                    </p>
                                    <div style="margin:10px 0;text-align:center">
                                      <table
                                        align="center"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="margin:0 auto"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style="background-color:#252f3d;border-radius:6px"
                                            >
                                              <a
                                                href="${resetToken}"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style="display:inline-block;color:#fff;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-size:16px;font-weight:bold;text-decoration:none;padding:12px 18px"
                                              >
                                                Reset Password
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <p
                                      style="font-size:12px;line-height:18px;margin:10px 0 0;color:#555;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;text-align:center;word-break:break-all"
                                    >
                                      If the button doesn’t work, copy and paste this link into your browser:<br />
                                      <a href="${resetToken}" style="color:#1a73e8;text-decoration:underline">
                                        ${resetToken}
                                      </a>
                                    </p>
                                    <p
                                      style="font-size:14px;line-height:24px;margin:0px;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;text-align:center"
                                    >
                                      (This link is valid for 10 minutes)
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr
                      style="width:100%;border:none;border-top:1px solid #eaeaea"
                    />
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding:25px 35px"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="font-size:14px;line-height:24px;margin:0px;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
                            >
                              Showrty will never email you and ask
                              you to disclose or verify your password, credit
                              card, or banking account number.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="font-size:12px;line-height:24px;margin:24px 0;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;padding:0 20px"
            >
              This message was produced and distributed by IPOS, Inc. All rights reserved.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`;
