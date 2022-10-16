exports = async function(changeEvent) {
    var docId = changeEvent.fullDocument._id;

    const countercollection = context.services.get("Cluster0").db(changeEvent.ns.db).collection("counters");
    const hospitalcollection = context.services.get("Cluster0").db(changeEvent.ns.db).collection(changeEvent.ns.coll);

    var counter = await countercollection.findOneAndUpdate({_id: changeEvent.ns },{ $inc: { seq_value: 1 }}, { returnNewDocument: true, upsert : true});
    var updateRes = await hospitalcollection.updateOne({_id : docId},{ $set : {hospitalID : counter.seq_value}});

 };