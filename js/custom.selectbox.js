(function ($) {
	$.fn.selectbox = function (params) {
		return this.each(function () {
			this.$select = $('<div class="custom_select collapsed"><input readonly type="text" class="custom_select_value"><span class="custom_select_triangle"></span><ul class="custom_select_options"></ul></div>');

			var self = this;
			this.fill = function () {
				var optionsHtml = ''
					,option
					,selected
					,disabled;

				for(var i = 0, max = this.options.length; i < max; i++) {
					option = this.options[i];
					selected = '';
					disabled = '';
					if(option.value == this.value) {
						this.selectedOptionIndex = i;
						this.value = option.value;
						selected = 'selected';
					}

					if($(option).attr('disabled'))
						disabled = 'disabled';

					optionsHtml += '<li class="custom_select_option ' + disabled + ' ' + selected + '" data-index="' + i + '" data-value="' + option.value + '">' + option.text + '</li>';
				}
				this.$select.find('.custom_select_options').append(optionsHtml);
				this.selectOptionByValue();
			};

			this.replace = function () {
				$(this).hide();
				$(this).parent().append(this.$select);
			};

			this.selectOptionByValue = function () {
				var $option = this.getOptionByValue();
				this.selectOption($option);
			};

			this.selectOptionByIndex = function () {
				var $option = this.getOptionByIndex();
				this.selectOption($option);
			};

			this.selectOption = function ($option) {
				this.$select.find('.custom_select_option').removeClass('selected');
				$option.addClass('selected');
				this.$select.find('.custom_select_value').val($option.text());
				this.value = $option.data('value');
			};

			this.getOptionByValue = function (optionValue) {
				optionValue = optionValue || this.value;
				return this.$select.find('.custom_select_option[data-value="' + optionValue + '"]');
			};

			this.getOptionByIndex = function (optionIndex) {
				optionIndex = optionIndex || this.selectedOptionIndex;
				return this.$select.find('.custom_select_option[data-index="' + optionIndex + '"]');
			};

			this.toggleOptions = function () {
				this.$select.toggleClass('collapsed');
			};

			this.hideOptions = function () {
				this.$select.addClass('collapsed');
			};

			this.showOptions = function () {
				this.$select.removeClass('collapsed');
			};

			this.isOptionDisabled = function (index) {
				var $option = this.getOptionByIndex(index);
				return $option.hasClass('disabled');
			};

			this.selectPrevOption = function () {
				while(this.selectedOptionIndex > 0) {
					this.selectedOptionIndex--;
					if(!this.isOptionDisabled()) {
						this.selectOptionByIndex();
						break;
					}
				}
			};

			this.selectNextOption = function () {
				while(this.selectedOptionIndex < this.options.length - 1) {
					this.selectedOptionIndex++;
					if(!this.isOptionDisabled()) {
						this.selectOptionByIndex();
						break;
					}
				}
			};

			this.mouseClickHandler = function () {
				this.$select.on('click', function () {
					self.toggleOptions();
				});

				this.$select.find('.custom_select_option').on('click', function () {
					var index = $(this).data('index');
					self.$select.find('.custom_select_value').focus();
					if(self.isOptionDisabled(index))
						return false;

					self.selectedOptionIndex = index;
					self.selectOption($(this));
				});

				this.$select.find('.custom_select_triangle').on('click', function () {
					self.$select.find('.custom_select_value').focus();
				});

				$(document).on('mouseup', function (event) {
					var container = self.$select;
					if (!container.is(event.target) && container.has(event.target).length === 0) {
						self.hideOptions();
					}
				});
			};

			this.keyDownHandler = function () {
				this.$select.find('.custom_select_value').on('keydown', function (event) {
					var keyCode = event.keyCode;
					switch(keyCode) {
						case 40:
							self.selectNextOption();
							break;
						case 38:
							self.selectPrevOption();
							break;
						case 13:
							self.hideOptions();
							break;
						default:
							break;
					}
				});
			};

			this.fill();
			this.replace();
			this.mouseClickHandler();
			this.keyDownHandler();
		});
	};
})(jQuery);