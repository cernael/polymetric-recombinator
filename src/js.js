var state = {};

$(function() {
	$('<form id="settings"/>')
	.append($('<label for="number_of_voices">Number of voices: </label>'))
	.append($('<input type="number" name="number_of_voices" id="number_of_voices" min="1" max="10" value="3">'))
	.append($('<label for="notes_per_beat">Notes per beat: </label>'))
	.append($('<input type="number" name="notes_per_beat" id="notes_per_beat" min="1" max="8" value="2">'))
	.append('<input type = "color">').on('change', function(){alert(this.value)})
	.append('<input type="submit">')
	.on('submit', generateVoiceLengthInputs)
	.appendTo($('.settings'));
});

function generateVoiceLengthInputs(){
	$('#voice_lengths').remove();
	$('#voice_rhythms').remove();
	$('<form id="voice_lengths"/>')
	.append($('<label>Voice lengths: </label>'))
	.appendTo($('.voice_lengths'));
	var n = $('#number_of_voices').val();
	event.preventDefault();

	for (var i = 0; i < n; i++) {
		$('#voice_lengths label').append('<input type="number" name="voice_length" class="voice_length" min="3" max="100">');
	};
	
	$('#voice_lengths').append('<input type="submit">').on('submit', generateRhythmCheckBoxes);
};

function generateRhythmCheckBoxes(){
	$('#voice_rhythms').remove();
	var m = $('#number_of_voices').val();
	event.preventDefault();
	$('<form id="voice_rhythms"/>').appendTo('.voice_rhythms');
	var list = $('.voice_length');
	for (var i = 0; i < list.length; i++) {
		list[i] = list[i].value * $('#notes_per_beat').val();
	};
	for (var i = 0; i < m; i++) {
		var div = $('<div/>');
		// generate checkboxes
		for (var j = 0; j < list[i]; j++) {
			div.append($('<input type="checkbox" value="' + i + '-' + j + '" />').on('change', list, drawRhythmMap));
			// Generate data structure and add click/toggle handler
		};
		div.appendTo('#voice_rhythms');
	};
	// Ha en ny $('.voice_length') här, och rensa ut oldlist/newlist-idiotin från findLowestCommonProduct()?
	$('#rhythm_map').css({width: findLowestCommonProduct($('.voice_length')), height: m * 25});
};

function drawRhythmMap(event){
	// Dafuq, går findLowestCommonProduct in och ändrar i generateRhythmCheckboxes' list-variabel? Of course it does.
	console.log("I'm drawing!", event.data, this.value.split('-'));
	for (var i = 0; i < event.data.length; i++) {
		console.log(event.data[i]);
	};
};

function findLowestCommonProduct(list){
// testing list instead of oldlist as in parameter
//*
	var product = 1;
	for (var i = 0; i < list.length; i++) {
		product *= list[i];
	};
	var primes = getPrimeFactors(product);
	var res = 1;
	primes.reverse();

	// changed all newlist to list below
	while(primes.length){
		var prime = primes.pop();
		product /= prime;
		var flag = true;
		for (var i = 0; i < list.length; i++) {
			if (flag && product%list[i]){
				// when rest of primes does not contain all factors of newlist[i]
				res *= prime;
				flag = false;
				list[i] /= prime;
			}
			else if(!flag && (list[i] % prime === 0)){
				// when newlist[i] does contain prime as factor
				list[i] /= prime;
			}
		};	
	};
/*/
	var product = 1;
	var newlist = [];
	console.log('start', newlist);
	for (var i = 0; i < oldlist.length; i++) {
		var n = oldlist[i];
		product *= n;
		newlist.push(n);
	};
	console.log(newlist, oldlist);
	var primes = getPrimeFactors(product);
	var res = 1;
	primes.reverse();

	while(primes.length){
		var prime = primes.pop();
		product /= prime;
		for (var i = 0; i < newlist.length; i++) {
			if (product % newlist[i]) {
				res *= prime;
				for (var j = 0; j < newlist.length; j++) {
					if(newlist[j] % prime === 0){
						newlist[j] /= prime;
					}
				};
				break;
			}
		};	
	};
//*/
	console.log('end', list);
	return res;
};

function getPrimeFactors(num) {
	/**
	* @author Larry Battle - http://bateru.com/news/contact-me
	* @date May 11, 2012
	* @license MIT and GPL v3
	* @purpose Return the prime factors of a number.
	* @info - http://bateru.com/news/?s=prime+factors
	*/
    num = Math.floor(num);
    var root, factors = [], x, sqrt = Math.sqrt, doLoop = 1 < num;
    while( doLoop ){
        root = sqrt(num);
        x = 2;
        if (num % x) {
            x = 3;
            while ((num % x) && ((x += 2) < root));
        }
        x = (x > root) ? num : x;
        factors.push(x);
        doLoop = ( x != num );
        num /= x;
    };
    return factors;
};