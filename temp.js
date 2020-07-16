function getProductsAssignments() {
    return {
        B001: ['movies', 'fantasy'],
        D8: ['tolkien', 'root'],
        C1: ['tolkien', 'fantasy'],
        C2: ['root'],
        RX20: []
    };
}

var assignments = getProductsAssignments();
var assignedCategories = assignments[''];

console.log(assignedCategories);