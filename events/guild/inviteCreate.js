module.exports = async(client, invite) => {
    client.invites.set(invite.code, invite);
    const data = await require('../../tools/database/getLevel')(invite.inviter.id);
    if(data){
        data.server.invites.push(new Date().getTime());
        if(new Date(data.updates[(data.updates.length) - 1]).getDate() != new Date().getDate()) data.updates.push(new Date().getTime());
        await data.updateOne(data, (err, result) => {
                    if(err) throw err;
                })
    }
}