
const range = (a, b) => Array(b - a).fill().map((e, i) => i + a);

function matrixTraversal(matrix, matrixSize, frameSize, operation) {

    range(0, matrixSize)
        .map(x => x * matrixSize)
        .map(rowNo => range(rowNo, matrixSize + rowNo))
        .forEach((row) => {
            range(0, matrixSize - frameSize + 1)
                .map(colid => row.slice(colid, colid + frameSize)
                    .map((i) => matrix[i]))
                .forEach((frame) => operation(frame));
        });

    range(0, matrixSize - frameSize + 1)
        .map(rowNo => range(rowNo * matrixSize, rowNo * matrixSize + matrixSize))
        .forEach((row) => {
            row.forEach((ele) => {
                const frame = range(0, frameSize)
                    .map((j) => ele + j * matrixSize)
                    .map((i) => matrix[i]);
                operation(frame);
            })
        });



    range(0, matrixSize - (frameSize - 1))
        .map(rowNo => range(rowNo * matrixSize, rowNo * matrixSize + matrixSize))
        .map((colid) => colid.slice(0, matrixSize - (frameSize - 1)))
        .map(dRow => {
            dRow.map((frameFirstCell) => range(0, frameSize)
                    .map((indexInFrame) => (frameFirstCell + indexInFrame * (matrixSize + 1)))
                    .map(index => matrix[index]))
                .forEach(operation)
        })


    range(0, matrixSize - (frameSize - 1))
        .map(rowNo => range(rowNo * matrixSize, rowNo * matrixSize + matrixSize))
        .map((colid) => colid.slice((frameSize - 1), matrixSize))
        .map(dRow => {
            dRow.map((frameFirstCell) => range(0, frameSize)
                    .map((indexInFrame) => (frameFirstCell + indexInFrame * (matrixSize - 1)))
                    .map(index => matrix[index]))
                .forEach(operation)
        })



}


export default matrixTraversal;

