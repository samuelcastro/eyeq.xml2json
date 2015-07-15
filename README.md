# eyeq.xml2json
The xml2json tool converter will help you to convert XML to JSON in a simple and fast way.

## Getting Start ##

### Install the eyeq.xml2json as a global module ###

```
sudo npm install git+https://git@github.com/samuelcastro/eyeq.xml2json.git -g
```

### Convert XML to JSON ###

```
eyeq.xml2json -o /your/xml/folder -d /your/destination/json/path
```

The module will convert all _xml files_ inside your xml folder creating the same directory structure.

### For Example: ###

```
/data/xml
/data/xml/folder1/"my-file-1.xml"
/data/xml/folder2/"my-file-2.xml"
/data/xml/folder3/"my-file-3.xml"
/data/xml/folder4/"my-file-4.xml"
```

When you run: `eyeq.xml2json -o /data/xml -d /data/json`

Will be create this structure:

```
/data/json
/data/json/folder1/"my-file-1.json"
/data/json/folder2/"my-file-2.json"
/data/json/folder3/"my-file-3.json"
/data/json/folder4/"my-file-4.json"
```
