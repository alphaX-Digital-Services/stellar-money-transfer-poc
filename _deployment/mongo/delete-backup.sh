#!/bin/sh

find /home/ubuntu/workspace/heymateServer/_deployment/mongo/backupsDB/backup-* -maxdepth 1 -type d -mtime +30 -exec rm -rv {} +