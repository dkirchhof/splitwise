function getInflow(node, debts) {
    return debts.filter(edge => edge.to === node).reduce((sum, edge) => sum + edge.value, 0);
}

function getOutflow(node, debts) {
    return debts.filter(edge => edge.from === node).reduce((sum, edge) => sum + edge.value, 0);
}

function getNetChange(node, debts) {
    return getInflow(node, debts) - getOutflow(node, debts);
}

function simplifyDebtsRec(netChanges, result) {
    // if every net change is 0, we are done
    if (netChanges.every(nc => nc.value === 0)) {
        return result;
    }

    // largest value
    const maxInflowing = netChanges.reduce(
        (prev, cur) => cur.value > prev.value ? cur : prev,
        { node: "", value: 0 },
    );

    // smallest value
    const maxOutflowing = netChanges.reduce(
        (prev, cur) => cur.value < prev.value ? cur : prev, 
        { node: "", value: 0 },
    );

    const min = Math.min(
        Math.abs(maxInflowing.value), 
        Math.abs(maxOutflowing.value),
    );

    const newNetChanges = netChanges.map(nc => {
        if (nc === maxInflowing) {
            return {
                ...nc,
                value: nc.value - min,
            };
        }

        if (nc === maxOutflowing) {
            return {
                ...nc,
                value: nc.value + min,
            };
        }

        return nc;
    });

    const newResult = result.concat([
        { from: maxOutflowing.node, to: maxInflowing.node, value: min },
    ]);

    return simplifyDebtsRec(newNetChanges, newResult);
}

export function simplifyDebts(nodes, debts) {
    const netChanges = nodes.map(node => {
        return { node, value: getNetChange(node, debts) };
    });

    return simplifyDebtsRec(netChanges, []);
}
