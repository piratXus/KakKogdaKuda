
import 'bootstrap/dist/css/bootstrap.css'
import 'angularjs-slider/dist/rzslider.css'
// import 'angular-bootstrap-toggle-switch/dist/css/bootstrap3/bootstrap-switch.css'


class DateController {
    constructor(moodService) {
        this.moodService = moodService;
        this.ourMap = this.moodService.ourMap;
        this.startDate = new Date();
        this.startDate.setHours(this.startDate.getHours());
        this.dates = this.setDateSlider(this.startDate.getFullYear());
        this.slider = this.setSlider();
        this.isUser = false;
        this.isShow = false;
        this.isCurrentDate = true;
        this.fromDate;
        this.toDate;
    };

    selectUserMarkers() {
        this.sendDateToServer(this.slider.minValue, this.slider.maxValue);
    }

    setSlider() {
        this.dates[(this.dates.length - 1)].setHours(23);
        this.dates[(this.dates.length - 1)].setMinutes(59);
        this.dates[(this.dates.length - 1)].setSeconds(59);
        return {
            minValue: this.dates[0],
            maxValue: this.dates[(this.dates.length - 1)],
            options: {
                stepsArray: this.dates,
                translate: function (date) {
                    if (date != null)
                        return date.toDateString();
                    return '';
                },
                onChange: () => {
                    this.sendDateToServer(this.slider.minValue, this.slider.maxValue);
                }
            }
        };
    };

    nextYear() {
        let year = this.dates[0].getFullYear();
        this.startDate.setFullYear(year);
        this.dates = this.setDateSlider(year + 1);
        this.slider = this.setSlider();
        this.sendDateToServer(this.slider.minValue, this.slider.maxValue);
    }

    prevYear() {
        let year = this.dates[0].getFullYear();
        this.startDate.setFullYear(year);
        this.dates = this.setDateSlider(year - 1);
        this.slider = this.setSlider();
        this.sendDateToServer(this.slider.minValue, this.slider.maxValue);
    }

    currYear() {
        this.dates = this.setDateSlider(new Date().getFullYear());
        this.slider = this.setSlider();
        this.sendDateToServer(this.slider.minValue, this.slider.maxValue);
    }

    setDateSlider(currentYear) {
        this.isCurrentDate = false;
        let currentDate = new Date();
        let datesArr = [];
        for (var year = currentYear; year < currentYear + 1; year++) {
            let maxMonth;
            if (year == currentDate.getFullYear()) {
                this.isCurrentDate = true;
                maxMonth = currentDate.getMonth() + 1;
            } else {
                maxMonth = 12
            }
            ;
            for (var month = 0; month < maxMonth; month++) {
                let maxDay;
                if (year == currentDate.getFullYear() && month == currentDate.getMonth()) {
                    maxDay = currentDate.getDate();
                }else {
                    if(month == 0 || month == 11 || month == 6 || month == 7){
                        maxDay= 31;
                    }else if(month/2 == 0){
                        maxDay = 30;
                    }else if(month == 1){
                        if(year/4 == 0 && year/100 !=0 || year/400 == 0){
                            maxDay = 29;
                        } else maxDay = 28;
                    } else {
                        maxDay = 31
                    }
                    ;
                }
                ;

                for (var day = 1; day <= maxDay; day++) {
                    datesArr.push(new Date(year, month, day));
                }
                ;
            }
            ;
        }
        ;
        return datesArr;
    };

    sendDateToServer(fromDate, toDate) {
        this.ourMap = this.moodService.ourMap;
        let to;
        let from;
        if (toDate && fromDate) {
            to = Date.parse(toDate.toString());
            from = Date.parse(fromDate.toString());
        }
        ;
        if (!toDate && fromDate) {
            to = undefined;
            from = Date.parse(fromDate.toString());
        }
        ;

        if (toDate && !fromDate) {
            to = Date.parse(toDate.toString());
            from = undefined;
        }
        ;
        if (!toDate && !fromDate) {
            to = undefined;
            from = undefined;
        }
        ;

        this.moodService.fromDate = from;
        this.moodService.toDate = to;
        this.moodService.listenerDateInput(this.ourMap, from, to, this.isUser);
    };
}

DateController.$inject = ['dataMoodService'];
export default DateController;