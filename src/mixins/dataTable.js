import recipeService from '../services/s-recipes'

export default {
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      data: []
    }
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination
    })
  },
  methods: {
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber } = props.pagination
      this.loading = true
      let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage
      let startRow = (page - 1) * rowsPerPage
      recipeService.get(`${this.url}?limit=${fetchCount}&offset=${startRow}`)
        .then((response) => {
          this.pagination.rowsNumber = response.data.count
          this.data = response.data.results
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.loading = false
        }, (err) => {
          console.log(err)
        })
    }
  }
}
