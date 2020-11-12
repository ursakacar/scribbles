# Filterlist Subscriptions

## (obsolete) abp:subscribe links

Limited the list of websites that can use `abp:subscribe` links, see https://gitlab.com/eyeo/adblockplus/adblockpluschrome/-/issues/263

### Supported

[HTTPS url](https://subscribe.adblockplus.org?location=https%3A//raw.githubusercontent.com/cjx82630/cjxlist/master/cjx-annoyance.txt)

[complete link with title](https://subscribe.adblockplus.org?location=https%3A%2F%2Fexample.com%2Ffoo.txt&amp;title=foo)

[link without title](https://subscribe.adblockplus.org?location=https%3A%2F%2Fexample.com%2Ffoo.txt)

[link with filter list title same as URL](https://subscribe.adblockplus.org?location=https%3A%2F%2Fexample.com%2Ffoo.txt&amp;title=https%3A%2F%2Fexample.com%2Ffoo.txt)

### Unsupported

[HTTP url](https://subscribe.adblockplus.org?location=http%3A//raw.githubusercontent.com/cjx82630/cjxlist/master/cjx-annoyance.txt)

[another HTTP url](https://subscribe.adblockplus.org?location=http%3A%2F%2Fexample.com%2Ffoo.txt&amp;title=foo)

## Add filterlist via URL

### Supported

```yml title=HTTPS_url
https://www.example.com/filterlist.txt
```

```yml title=data_url
data:text/plain,foo
```

### Unsupported

```yml title=HTTP_url
http://www.example.com/filterlist.txt
```

```yml title=file_url
file://filterlist.txt
```

```yml title=ftp_protocol
ftp://www.example.com/filterlist.txt
```
