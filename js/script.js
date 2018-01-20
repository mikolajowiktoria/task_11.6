$(function() {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
	// Klasa-Obiekt-Prototyp 'Column' z parametrem (name)
	function Column(name) {
		var self = this;
		this.id = randomString(); // Metoda randomString() - wyzej
		this.name = name;
		this.$element = createColumn(); // Metoda createColumn() - nizej
		function createColumn() { // Embedded method
			// CREATING COMPONENTS OF COLUMNS
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn btn-danger btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('btn btn-primary add-card').text('Add a card');
			// ADDING EVENTS
			$columnDelete.click(function() {
				self.removeColumn();
			});
			$columnAddCard.click(function(event) {
				self.addCard(new Card(prompt("Enter the name of the card")));
			});
			// CONSTRUCTION OF THE COLUMN ELEMENT AND RETURNING THE COLUMN
			$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);
			// RETURN OF CREATED COLUMN
			return $column;
		}
	}
    
    // Implementacja metod: addCard() i removeColumn() do klasy 'Column'
	Column.prototype = {
		addCard: function(card) {         // parametrem w () jest karta którą dodajemy
			this.$element.children('ul').append(card.$element);
		},                                // podpinanie card do listy 'ul' w div.column
		removeColumn: function() {        // w momencie wciśnięcia buttona btn-delete
			this.$element.remove();       // usuń div.column poprzez remove();
		}
	};
    
	// Klasa-Obiekt-Prototyp 'Card' z parametrem (description)
	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			// CREATING THE BLOCKS
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn btn-danger btn-delete').text('x');
			// BINDING TO CLICK EVENT
			$cardDelete.click(function() {
				self.removeCard();
			});
			// COMBINING BLOCKS AND RETURNING THE CARD
			$card.append($cardDelete).append($cardDescription);
			return $card;
		}
	}
    // Implementacja metody removeCard() do klasy 'Card'
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();        // po wcisnieciu buttona usun card
        }
    }
    
    // Tworzenie obiektu 'board'. addColumn -> Metoda przypięcia column element do board element.
    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    
    // Biblioteka JQuery-UI - drag&drop
    function initSortable() {
        $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    // po klikneciu na button 'Add a column' prośba o podanie nazwy kolumny i stworzenie nowego obiektu klasy Column z podaną nazwą kolumny. Do obiektu 'board' dodana zostanie nowa kolumna.
    $('.create-column').click(function() {
       var name = prompt('Please enter a column name');
       var column = new Column(name);
          board.addColumn(column);    
    });
    
    // Tworzenie nowym obiektów-kolumn w klasie 'Column'
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');
    
    // Dodawanie kolumn do obiektu 'board'
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);
});
