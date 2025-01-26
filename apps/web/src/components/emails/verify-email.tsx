import { Html } from '@react-email/components';

export function VerifyEmailCode({ code }: { code: string }) {
  return (
    <Html>
      <body
        style={{
          backgroundColor: '#f7fafc',
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          lineHeight: 1.625,
          color: '#2d3748',
          margin: 0,
          padding: 0,
        }}
      >
        <table
          width="100%"
          style={{
            minHeight: '100vh',
            width: '100%',
            padding: '40px 0',
            borderSpacing: 0,
          }}
        >
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <table
                width="480"
                style={{
                  margin: '0 auto',
                  width: '100%',
                  maxWidth: '448px',
                  overflow: 'hidden',
                  borderRadius: '0.5rem',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
                  borderSpacing: 0,
                }}
              >
                <tr>
                  <td
                    style={{
                      background: 'linear-gradient(to right, #805AD5, #667EEA)',
                      padding: '24px',
                      color: '#ffffff',
                    }}
                  >
                    <table style={{ borderSpacing: 0, padding: 0, margin: 0 }}>
                      <tbody>
                        <tr style={{ verticalAlign: 'middle' }}>
                          <td
                            style={{
                              width: '32px',
                              height: '32px',
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              borderRadius: '9999px',
                              textAlign: 'center',
                            }}
                          >
                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>IQ</span>
                          </td>

                          <td style={{ paddingLeft: '12px' }}>
                            <h1
                              style={{
                                margin: 0,
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: '#ffffff',
                              }}
                            >
                              ICue
                            </h1>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: '24px' }}>
                    <h2
                      style={{
                        marginBottom: '8px',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#1a202c',
                      }}
                    >
                      아이큐 이메일 인증 안내
                    </h2>
                    <p
                      style={{
                        marginBottom: '16px',
                        fontSize: '0.875rem',
                        color: '#4a5568',
                      }}
                    >
                      아래 코드를 입력하여 인증을 완료해주세요.
                    </p>

                    <div
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#2d3748',
                        backgroundColor: '#f9fafb',
                        padding: '12px 16px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        letterSpacing: '2px',
                        marginBottom: '16px',
                      }}
                    >
                      {code}
                    </div>

                    <p
                      style={{
                        marginTop: '16px',
                        fontSize: '0.875rem',
                        color: '#718096',
                      }}
                    >
                      이 코드는 1시간 동안만 유효합니다. 만약 회원가입(또는 로그인)을 요청한 적이
                      없다면 본 메일을 무시하셔도 됩니다.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      backgroundColor: '#f9fafb',
                      padding: '16px',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      color: '#a0aec0',
                    }}
                  >
                    © 2025 ICue Inc. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </Html>
  );
}
