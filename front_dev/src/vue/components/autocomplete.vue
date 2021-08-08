<template>
  <div class="autocomplete">
    <form autocomplete="off"><!--required for disable google chrome auto fill-->
      <input
          type="text"
          :placeholder="placeholder"
          :name="inputname"
          class="form-control"
          v-model="searchquery"
          @input="autoComplete"
          @keydown.down="onArrowDown"
          @keydown.up="onArrowUp"
          @keydown.enter="onEnter"
      >
      <div class="autocomplete-result" v-show="isOpen">
        <ul class="list-group">
          <li class="list-group-item"
              v-for="(result, i) in results"
              :key="result.id"
              @click="setResult(result)"
              :class="{ 'is-active': i === arrowCounter }"
          >
            {{ result[choice] }}
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "autocomplete",
  props: {
    source: {
      type: String,
      required: true,
    },
    choice: {
      type: String,
      required: true,
    },

    placeholder: String,
    inputname: String
  },
  data: function () {
    return {
      searchquery: '',
      results: [],
      isOpen: false,
      arrowCounter: -1,
    }
  },
  methods: {
    autoComplete() {
      this.$emit('autocomplete-start');
      this.results = [];
      if (this.searchquery.length > 3) {
        axios.get(this.source, {
          params: {[this.inputname]: this.searchquery},
          headers: {
            'x-rapidapi-key': '3c58ca8e3amsheca1c2c300adf53p1dc157jsn42d72119dd2f',
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
          }
        })
            .then(response => {
              this.results = response.data.data;
              this.isOpen = true;
            })
            .catch((error) => {
              if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                alert(error.response.status + ':' + error.response.data.error);
                // console.log(error.response.headers);
              } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
              } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
              }
              // console.log(error.config);
            });
      }
    },
    setResult(item) {
      this.isOpen = false;
      this.searchquery = item[this.choice];
      this.$emit('selected', item);
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length - 1) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.setResult(this.results[this.arrowCounter]);
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
    console.log('napojeno')
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
.autocomplete-result .is-active,
.autocomplete-result li:hover {
  background-color: #379d2f;
  color: white;
}
</style>
