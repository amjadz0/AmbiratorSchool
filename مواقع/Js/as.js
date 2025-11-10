class User {
    constructor(id, name, salary) {
        this.id = id;
        this.salary = salary + 50000;
        this.name = name;
        this.msg = function() {
            return this.id * 2;
        }

        wraaaat() => this.id * this.salary;

    }
}
let eamn = new User(5, "amajd", 50000);
console.log(eamn.id);
console.log(eamn.name);
console.log(eamn.salary);
console.log(eamn.msg());
console.log(eamn.wraaaat());