var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var reloadCount = 0;
var isPending = false;
var oldest10 = null;
var ageArray = [[], [], [], [], [], []];
var loading = "      \n  <div class='spinner'></div>\n  <div class='spinner2'></div>\n  <p class='loading'>Loading...</p>\n";
var fetcher = document.getElementById('fetcher');
var table = document.getElementById('table');
var spinner = document.getElementById('spinner');
var chartContainer = document.getElementById('chart-container');
var welcome = document.getElementById('welcome');
var bgChanger = document.getElementById('bg-changer');
var errorWrapper = document.getElementById('error');
if (!oldest10) {
    var h3 = document.createElement('h3');
    h3.textContent = 'Press the button to fetch some data 🖱️';
    welcome.appendChild(h3);
}
window.addEventListener("unload", function () {
    var count = sessionStorage.getItem('counter') || 0;
    if (typeof count == 'string') {
        count = +JSON.parse(count);
    }
    count++;
    sessionStorage.setItem('counter', JSON.stringify(count));
});
window.addEventListener('DOMContentLoaded', function () {
    var count = +sessionStorage.getItem('counter') || 0;
    if (typeof count == 'string') {
        count = +JSON.parse(count);
    }
    if (count % 5 == 0) {
        bgChanger.classList.add('change-color');
    }
});
var value = sessionStorage.getItem('counter');
if (value) {
    JSON.parse(value);
    reloadCount = (+value);
}
var labels = ['20-29', '30-39', '40-49', '50-59', '60-69', '70-79'];
var chartData = {
    labels: labels,
    datasets: [{
            label: 'Population age in France',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            data: [0, 0, 0, 0, 0, 0]
        }]
};
var config = {
    type: 'doughnut',
    data: chartData,
    options: {}
};
fetcher.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var canvas, ageChart, data, results, sort, myChart, err_1;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                spinner.innerHTML = loading;
                table.innerHTML = null;
                chartContainer.innerHTML = null;
                welcome.innerHTML = null;
                errorWrapper.innerHTML = null;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 4, , 5]);
                canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'ageChart');
                chartContainer.appendChild(canvas);
                ageChart = document.getElementById('ageChart');
                return [4 /*yield*/, fetch('https://randomuser.me/api/?nat=fr&gender=male&results=1000')];
            case 2:
                data = _g.sent();
                return [4 /*yield*/, data.json()];
            case 3:
                results = (_g.sent()).results;
                sort = results.sort(function (a, b) { return (b.dob.age) - (a.dob.age); });
                oldest10 = (sort.slice(0, 9));
                results.map(function (person) {
                    if (person.dob.age >= 20 && person.dob.age <= 29) {
                        ageArray[0].push(person.dob.age);
                    }
                    if (person.dob.age >= 30 && person.dob.age <= 39) {
                        ageArray[1].push(person.dob.age);
                    }
                    if (person.dob.age >= 40 && person.dob.age <= 49) {
                        ageArray[2].push(person.dob.age);
                    }
                    if (person.dob.age >= 50 && person.dob.age <= 59) {
                        ageArray[3].push(person.dob.age);
                    }
                    if (person.dob.age >= 60 && person.dob.age <= 69) {
                        ageArray[4].push(person.dob.age);
                    }
                    if (person.dob.age >= 70 && person.dob.age <= 79) {
                        ageArray[5].push(person.dob.age);
                    }
                });
                chartData.datasets[0].data = [(_a = ageArray[0]) === null || _a === void 0 ? void 0 : _a.length, (_b = ageArray[1]) === null || _b === void 0 ? void 0 : _b.length, (_c = ageArray[2]) === null || _c === void 0 ? void 0 : _c.length, (_d = ageArray[3]) === null || _d === void 0 ? void 0 : _d.length, (_e = ageArray[4]) === null || _e === void 0 ? void 0 : _e.length, (_f = ageArray[5]) === null || _f === void 0 ? void 0 : _f.length];
                myChart = new Chart(ageChart, config);
                table.innerHTML = "\n        <table>\n          <thead>\n            <tr>\n              <th>Name</th>\n              <th>City</th>\n              <th>Age</th>\n            </tr>\n          </thead>\n          <tbody>\n            " + oldest10.map(function (person) {
                    return ("<tr key=" + person.login.uuid + ">\n                  <td>" + person.name.title + " " + person.name.first + " " + person.name.last + "</td>\n                  <td>" + person.location.city + " " + person.location.country + "</td>\n                  <td>" + person.dob.age + "</td>\n                </tr>");
                }) + "\n          </tbody>\n        </table>\n      ";
                spinner.innerHTML = null;
                return [3 /*break*/, 5];
            case 4:
                err_1 = _g.sent();
                if (err_1 instanceof Error) {
                    spinner.innerHTML = null;
                    errorWrapper.innerHTML = '<h3>Something went wrong. Please retry.</h3>';
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
