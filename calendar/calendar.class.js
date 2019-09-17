import moment from 'moment';

export default class Calendar {
  /*
   * Constructor
   * Init with day, month and year
   * 
   */
  constructor(day, month, year) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  /*
   * Format month method
   * Create the array of days which will
   *be listed.
   */
  formatMonth() {
    /** Array of days */
    const _arr_ = new Array(42);
    /** This month start */
    const _monthStart_ = moment(`${this.year}-${this.month + 1}-01`);
    /** AUX buffer */
    const _buffer_ = _monthStart_.day();
    /** Variables */
    let _dayOfWeek_;
    let _day_;
    let n = 0;
    /*
     * Loop: create the first dates starting from last month
     */
    for (const i = 0; i < _buffer_; i++) {
      _dayOfWeek_ = _buffer_ - i;
      _day_ = moment(_monthStart_).subtract(_dayOfWeek_, 'days');
      _arr_[i] = {
        date: _day_
      };
    }
    /*
     * Loop: create the dates from the rest of the month.
     */
    for (const k = _buffer_; k < _arr_.length; k++) {
      _arr_[k] = {
        date: moment(_monthStart_).add(n, 'days')
      };
      n++;
    }
    /** End of method */
    /** RETURN */
    return _arr_;
  }

  /*
   * Set day method
   * Update elements with this day
   * 
   */
  setDay(_day) {
    const pageTitle = document.getElementsByClassName('title')[0];
    pageTitle.innerHTML = `<h1>${_day.local().format('dddd, MMMM Do YYYY')}</h1>`;
  }

  /*
   * Re-render method
   * Clear DOM and render the page
   *with anoter date. 
   */
  reRender(_container, _tools, _option) {
    /** Empty elements */
    _container.innerHTML = '';
    _tools.innerHTML = '';
    /*
     * Check action option (default: 'today')
     */
    switch (_option) {
      case 'next':
        /** Render next month */
        this.month++;
        if (this.month === 12) {
          this.month = 0;
          this.year++;
        }
        this.render(_container, _tools, this.formatMonth());
        break;
      case 'previous':
        /** Render previous month */
        this.month--;
        if (this.month === -1) {
          this.month = 11;
          this.year--;
        }
        this.render(_container, _tools, this.formatMonth());
        break;
      default:
        /** Render current month */
        this.day = moment().date();
        this.month = moment().month();
        this.year = moment().year();
        this.render(_container, _tools, this.formatMonth());
    }
  }

  /*
   * Render method
   * Render all components.
   * 
   */
  render(_container, _tools, _arr) {
    /*
     * Button: previous
     */
    const _prev_text_ = document.createTextNode('Prev');
    const _prev_ = document.createElement('button');
    _prev_.className = 'button toolbar__button';
    _prev_.addEventListener("click", () => {
      this.reRender(_container, _tools, 'previous');
    });
    _prev_.appendChild(_prev_text_);
    _tools.appendChild(_prev_);
    /*
     * Button: today
     */
    const _today_text_ = document.createTextNode('Today');
    const _today_ = document.createElement('button');
    _today_.className = 'button toolbar__button';
    _today_.addEventListener("click", () => {
      this.reRender(_container, _tools, 'today');
    });
    _today_.appendChild(_today_text_);
    _tools.appendChild(_today_);
    /*
     * Button: next
     */
    const _next_text_ = document.createTextNode('Next');
    const _next_ = document.createElement('button');
    _next_.className = 'button toolbar__button';
    _next_.addEventListener("click", () => {
      this.reRender(_container, _tools, 'next');
    });
    _next_.appendChild(_next_text_);
    _tools.appendChild(_next_);
    /*
     * Loop: for each day, create the card
     */
    for (let i = 0; i < _arr.length; i++) {
      const today = moment();
      /** Create card div. */
      let cardContent = document.createElement('div');
      /** Check if it is a day from this month */
      let monthClass;
      if (_arr[i].date.month() === this.month) {
        monthClass = '';
        /** Add card event */
        cardContent.addEventListener("click", () => {
          this.setDay(_arr[i].date);
        });
      } else {
        monthClass = ' disabled';
      }
      /** Check if it is today */
      let todayClass;
      if (_arr[i].date.format('DD/MM/YYYY') === today.format('DD/MM/YYYY')) {
        todayClass = ' today';
      } else {
        todayClass = '';
      }
      /** Style and content */
      cardContent.className = `card${monthClass}${todayClass}`;
      cardContent.innerHTML = `
      <p class="text--center">${_arr[i].date.format('DD/MM/YYYY')}</p>
      `;
      /** Append */
      _container.appendChild(cardContent);
    }
    /** End of method */
  }
};