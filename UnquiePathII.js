/* LeetCode 63. Unique Paths II
 * Partner  : Patrick.Chang
 * Date     : 2021/03/04 
 * Topic    : https://leetcode.com/problems/unique-paths-ii/
 * 
 * Input example: [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
 * Output example: 2
 * ps. 0 means road, 1 means dead road.
 * 
 * Key word : 
 *  1. Dynamic Programming - View the whole question as multiple same programs.
 */

// # Our best solution
function uniquePath(Input){
    const n = Input.length;
    const m = Input[0].length;

    // Lack of entry and goal or wrong length map
    if (Input[0][0] === 1 || Input[n-1][m-1] === 1 || m < 1 || n < 1){
        return 0;
    }

    // # Another solution: const rowData = Input.flat();
    const rowData = Input.reduce((a, b) => { return a.concat(b); }, []);

    // # Another solution: rowData.map((item, idx, arr) => { ... });
    for (let idx in rowData) {
        if (rowData[idx] === 1) {
            // Dead end
            rowData[idx] = 0;
        } else {
			if (idx === "0") {
				// Start
				rowData[idx] = 1;
			} else if (idx < m ) {
				// Top
				rowData[idx] = rowData[idx - 1];
			} else if (idx % m === 0) {
				// Left
				rowData[idx] = rowData[idx - m];
            } else {
                // Other
                rowData[idx] = rowData[idx - 1] + rowData[idx - m];
            }
        }
    }
    
    return rowData[m*n-1];
}

// # Recursive solution
function uniquePathRecursive(Input) {
    const rowData = Input.flat();
    return countPath(rowData, rowData.length-1, Input[0].length);
    
    // # Recursive function
    function countPath(Arr, index, width) {
		if (index === 0) {
			// Start
			return 1;
		} else if (Arr[index] === 1){
			// Dead road
			return 0;
		} else if (index < width) {
            // Top
            return countPath(Arr, index-1, width);
        } else if (index % width === 0) {
			// Left
			return countPath(Arr, index-width, width);
		}
        // Common situation
        return countPath(Arr, index-1, width) + countPath(Arr, index-width, width);
    }
}

function startTest() {
	// [[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]
	// [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
	// [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0]
	const input = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0]];
	document.getElementById('uniquePath').innerHTML = `
		uniquePath: ${uniquePath(input)} <br>
		uniquePathRecursive: ${uniquePathRecursive(input)}
	`
};

// # For test
// console.log(uniquePath([[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]));
// console.log(uniquePathRecursive([[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]));
