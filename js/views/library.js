var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#books',

  events: {
    'click #add': 'addBook'
  },

  initialize: function() {
    this.collection = new app.Library();
    this.collection.fetch({reset: true});

    this.listenTo(this.collection, 'add', this.renderBook);
    this.listenTo(this.collection, 'reset', this.render);

    this.render();
  },

  render: function() {
    this.collection.each(function(item) {
      this.renderBook(item);
    }, this);
  },

  renderBook: function(item) {
    var bookView = new app.BookView({
      model: item
    });
    this.$el.append(bookView.render().el);
  },

  addBook: function(e) {
    e.preventDefault();

    var formData = {};

    $('#addBook div').children('input').each(function(i, el) {
      var data = $(el).val().trim();

      if (data !== '') {
        formData[el.id] = data;
      }
    });

    this.collection.create(formData);
  }
});