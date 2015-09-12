for f in *.json
do
    [ -f "$f" ] && mv "$f" "${f%json}js"
done
