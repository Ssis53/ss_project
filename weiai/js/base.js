
window.onload = function () {
	headerAndToTop();
	marryRingAsideMenu();
	marryRingMainMunu();
	function headerAndToTop() {
		var buttonP = document.createElement('button');
		document.body.appendChild(buttonP);
		buttonP.innerHTML = '∧'
		buttonP.className = 'button_all'
		buttonP.style.display = 'none';
		
		window.onscroll = function () {
			var hei = document.body.scrollTop || document.documentElement.scrollTop;
			var navP = document.getElementsByTagName('nav')[0];
			if ( hei < 142 ) {
				var className = navP.className;
				navP.className = className.replace('nav_scroll',' ')
			} else {
				navP.className = 'nav_scroll'; 
			}
			if ( hei >= window.innerHeight-350) {
				buttonP.style.display = 'block';
			} else {
				buttonP.style.display = 'none';
			}
			buttonP.onclick = function () {
				var timer = window.setInterval(function () {
					var hei = document.body.scrollTop || document.documentElement.scrollTop;
					document.body.scrollTop = document.documentElement.scrollTop = hei-20;
					if( hei <= 0) {
						window.clearInterval(timer);
					}
				},10)
				
			}
		}
	}
	
	function marryRingAsideMenu () {
		var spanPs = document.querySelectorAll('.marry_ring_aside > ul > li span');
		var innerulPs = document.querySelectorAll('.marry_ring_aside > ul > li .inner_ul');
		//给每个span小加号绑定点击事件
		for ( var i = 0 ; i < spanPs.length ; i ++ ) {
			spanPs[i].index = i;
			spanPs[i].turn = false;
			spanPs[i].onclick = function () {
				if (this.turn === false) {
					var length = innerulPs[this.index].children.length;
					innerulPs[this.index].style.height = length*23 + 'px';
					this.style.background = 'url(../images/ring_pic/minus.png) no-repeat right center';
					this.turn = true;
				} else {
					innerulPs[this.index].style.height = 0 + 'px';
					this.style.background = 'url(../images/ring_pic/plus.png) no-repeat right center';
					this.turn = false;
				}
			
			} 
		}
	}
	
	function marryRingMainMune () {
		var showP = document.querySelector('.marry_ring_main_footnav_left ul:first-of-type li:first-child');
		var sortP = document.querySelector('.marry_ring_main_footnav_left ul:nth-child(2) li:first-child');
		showP.onclick = function () {
			changeList(this.parentNode);
		}
	}
}
