"use strict";
$(function () {
	var $orders = $('#orders');
	var $add = $('#add');
	var $name = $('#name');
	var $drink = $('#drink');
	var $get = $('#btn-get');

	var orderTemplate = "<li>" +
	"Name : {{Name}}, Drink = {{drink}} <button data-id={{id}} class = 'remove'>X</button>" +
	"</li>";
	function addOrder(order) {
		// console.log('enterd');
		$orders.append(Mustache.render(orderTemplate, order));
	}

	function clear(order) {
		$name ='';
		$drink ='';
	}


	// $get.on('click', function () {
			$.ajax({ 
			method: 'GET', 
			dataType: 'json', 
			contentType: 'application/json',
			url: '/orders',
			success :	function(response) { 
				// console.log(response);
				if(response.length !== 0) {
					console.log("success", response); 
					response.orders.forEach(function(orders) { 
						addOrder(orders); 
						console.log(orders);	
					});
				} else {
					$orders.append('<li> No Orders </li>');
				} 
			}, 
			error : function(e, ts, et) {
				console.error(ts);
				alert('some error'  + ts); 
			} 
		});
	// });
	
	$add.on('click', function() {
		//event.preventDefault();

		var order = {
			name  : $name.val(),
			drink : $drink.val()
		};

		$.ajax({
			url: '/orders',
			method: 'POST',
			contentType: 'application/json',
			data : JSON.stringify(order),
			success : function(response) {
				console.log(response);
				addOrder(order);
				clear(orders);
			},
			error: function(e, ts, et) {
				console.log(order);
				alert("error while appending "+ts+" "+et);
			}
		});
	});

	$orders.delegate('.remove', 'click', function() {
		// console.log($(this).attr('data-id'));
		event.preventDefault();
		var id = $(this).attr('data-id');
		$.ajax({
			url: '/orders/'+ id,
			type : 'DELETE',
			success : function (res) {
				console.log('success');
				// clear(orders);
				window.refresh;
			},

			error: function (e, ts, et) {
				console.log("error "+ts + e + et);
			
			}
		});
		
	});
});


