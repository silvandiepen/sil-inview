# Inview

A tiny Vue Directive to check and get back the inview percentage of an element. 


### Install

Install the package
`npm install @sil/inview`


Import the package

`import Inview from '~/@sil/inview`

Define the component:

```js
	Vue.directive(Inview);
```

Use the component with default values:

```html
<any-element v-inview />	
```


#### Arguments

| Argument            | Default               | Description                                                                                                         |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| root                | null                  | The observer root (from which element should the observer, observe)                                                 |
| margin              | `0px`                 | The observer rootMargin (margin around the observable element)                                                      |
| treshold            | `[0.0, 0.1, ... 1.0]` | Treshold are steps of observing, the more steps the more the function will be called, but it will also get heavier. |
| setClasses          | `true`                | Set classes to the element for inview and out of view                                                               |
| setCustomProperties | `true`                | Set custom properties to the element with the value of inview.                                                      |
| output              | `number`              | Output value by default is a number (between 0 and 1), but can also be a `percentage`                               |
| centered            | `false`               | The output value can be centered, which makes the inview value 1 (number) or 0% (percentage)                        |
| active              | `true`                | Active can be set on false, in that case the directive won't be triggered                                           |
| debug               | `false`               | Output some helpfull debug information                                                                              |
