<template>
  <div class="quote">
    <p class="content"><i class="material-icons">format_quote</i>Nothing's better than a picnic.<i class="material-icons">format_quote</i></p>
    <p class="author">- Zooey Deschanel</p>
  </div>
</template>

<style>
.quote .content {
  font-size: 4em;
  max-width: 550px;
  margin: 0 auto;
}
.quote .author {
  font-size: 1.5em;
}
.quote i {
  vertical-align: top;
}
@media (max-width: 600px) {
  .quote .content {
    font-size: 2.5em;
    padding: 0 3px;
  }
  .quote .author {
    font-size: 1.25em;
  }
}
</style>
