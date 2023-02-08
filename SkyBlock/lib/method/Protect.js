class Protect {

    DotProduct(A, B, P) {
        let S = [A[0], B[0]].sort((a, b) => a - b)
        let E = [A[1], B[1]].sort((a, b) => a - b)
        return P.x >= S[0] && P.x <= S[1] && P.z >= E[0] && P.z <= E[1] && P.dimid == 0
    }

    ReturnID(data, key, target) {
        let id = null
        Object.keys(data).some(value => {

            let Pair = data[value][key]

            if (this.DotProduct(Pair["first"], Pair["last"], target)) id = value

        })

        return id
    }

}


module.exports = new Protect()