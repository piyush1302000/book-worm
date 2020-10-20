export const snapshotToArray = snapshot => {
    let returnArray = []

    snapshot.forEach((childsnapShot) => {
        let item = childsnapShot.val()
        item.key = childsnapShot.key

        returnArray.push(item)
    })
    return returnArray;
}