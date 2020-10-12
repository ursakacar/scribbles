# Custom filters

## Whitelisting

### Domain

`@@|http://example.com/|$document`

`@@|http://www.example.com/|$document`

`@@||adblockplus.org^$document`

`@@||testpages.adblockplus.org^$document`

### Page

`@@|https://adblockplus.org/forum/|$document`

`@@|https://testpages.adblockplus.org/en/exceptions/document|$document`

`@@||youtube.com/watch?v=M7oiy9MCbeM|$document`

## Errors

#### elemhideemulation_nodomain

`#?#foo`

Correct: `example.com#?#foo`

Error: No active domain specified for extended element hiding filter

#### invalid_csp

`example.com$csp=base-uri`

Error: Invalid Content Security Policy

#### invalid_domain

`,##foo`

Correct: `##foo` or `example.com##foo` or `foo.com,bar.com##foo`

Error: Invalid (or empty) domain specified

#### invalid_regexp

`/[/`

Error: Invalid regular expression

#### short_pattern

`example`

Error: No error, just warning

#### snippet_nodomain

`#$#foo`

Correct: `example.com#$#foo`

Error: No active domain specified for snippet filter 

#### unexpected_filter_list_header

`[header]`

Error: Filter list headers are only allowed in downloadable filter lists.

#### unknown_option

`$foo`

Correct: `$script`, `$subdocument`, etc.

Error: Unknown filter option


### Copy paste for testing

Error filters:

```
#$#foo
#?#foo
adblockplus.org$csp=base-uri
,##foo
test.com$abc
||testpages.adblockplus.org^$csp=report-uri 'test'
/[/
||s.ip-cdn.com/js/jq.js$rewrite=abp-resource:blank-js,domain=example.com
```

Headers and duplicate filters should be ignored, new lines stripped

```
[header header]
##.ad_boxright1
/dealsaver/widget/*
duplicate

duplicate
! comment
```