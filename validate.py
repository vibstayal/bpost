import os
import dns.resolver
import smtplib
email = 'tayal.vibhu@gmail.com'

    # Extract the host
host = email.split('@')[1]
print host

    # Get the MX record so we can get the SMTP connection afterwards
try:
    records = dns.resolver.query(host, 'MX')
    mx_record = str(records[0].exchange)
except dns.exception.DNSException:
        # DNS record couldn't be found!
    print "DNS record couldn't be found!"

    # SMTP Conversation
server = smtplib.SMTP()
server.connect(mx_record)
server.helo(host)
server.mail(email)
code, message = server.rcpt(str(email))
server.quit()
print code, message