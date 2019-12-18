#!/bin/sh
DIR="backup-`date +%m%d%y`"
DEST=/home/ubuntu/workspace/heymateServer/_deployment/mongo/backupsDB/$DIR
mkdir $DEST
mongodump --host localhost:27018 -o $DEST
