module.exports = async (client, member) => {
    if (member.bot) return;
    const data = await require('../../tools/database/getLevel')(member.id);
    if (data) {
        data.server.leave.push(new Date().getTime());
        if (new Date(data.updates[(data.updates.length) - 1]).getDate() != new Date().getDate()) data.updates.push(new Date().getTime());
        await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
    }
}