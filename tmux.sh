DIR=${pwd}
SESSIONNAME=HashedComments
MEMNONIC=$(grep MEMNONIC .env | cut -d '=' -f 2-)
BLOCKSPEED=0
GASLIMIT=8000000
tmux new-session -s $SESSIONNAME \; \
	send-keys 'vi ${DIR}' C-m \; \
	split-window -v \; \
	split-window -v \; \
	send-keys "cd web && npm run serve" C-m \; \
	split-window -h \; \
	send-keys "cd extension && npm run serve" C-m \; \
	split-window -h \; \
	send-keys "ganache-cli -i 1337 -b ${BLOCKSPEED}  --gasLimit=${GASLIMIT}  -m ${MEMNONIC}" C-m \; \


