# Security Groups

## EC2 instance security group
- Inbound TCP 80 from 0.0.0.0/0
- Inbound TCP 443 from 0.0.0.0/0
- Inbound TCP 22 only from your own IP address
- No inbound rule for PostgreSQL 5432

## PostgreSQL exposure
- PostgreSQL runs only inside Docker network on EC2.
- Do not open port 5432 in the EC2 security group.
