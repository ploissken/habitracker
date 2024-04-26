module.exports = function (app, db) {
  app.post("/webhook", function (req, res) {
    console.info("[webhook] webhook request received");

    // reply habitica server asap
    res.status(200).json({});

    const webhookEvent = req.body;

    if (webhookEvent.webhookType === "taskActivity") {
      const taskActivityData = {
        challengeId: webhookEvent.task.challenge.id,
        challengeTaskId: webhookEvent.task.challenge.taskId,
        userTaskId: webhookEvent.task.id,
        taskText: webhookEvent.task.text,
        taskType: webhookEvent.task.type,
        delta: webhookEvent.delta,
        userId: webhookEvent.task.userId,
      };

      let columns = [
        "user_task_id",
        "user_id",
        "task_text",
        "task_type",
        "delta",
      ];

      let values = [
        taskActivityData.userTaskId,
        taskActivityData.userId,
        taskActivityData.taskText,
        taskActivityData.taskType,
        taskActivityData.delta,
      ];

      if (taskActivityData.challengeId) {
        columns.push("challenge_id");
        values.push(taskActivityData.challengeId);

        columns.push("challenge_task_id");
        values.push(taskActivityData.challengeTaskId);
      }

      const query = [
        "INSERT INTO task_activity",
        `(${columns.join(", ")})`,
        "VALUES",
        `(${values.map((val) => `'${val}'`).join(", ")})`,
      ].join(" ");

      console.info("[webhook query]: " + query);

      db.query(query).catch((e) => console.error(e));
    } else {
      console.info("[webhook] not taskActivity type start");
      console.info(JSON.stringify(req.body));
      console.info("[webhook] not taskActivity type end");
    }
  });
};
