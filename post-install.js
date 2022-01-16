const { exec } = require("child_process");

let command;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  console.log("Building on prod mode");
  command = exec("ng build --prod");
} else if (process.env.NODE_ENV === "staging") {
  console.log("Building on staging mode");
  command = exec("ng build --aot --configuration=staging");
}

if (command != undefined) {
  command.stdout.on("data", (data) => {
    console.log(data);
    console.log("Build finished");
  });

  command.stderr.on("data", (data) => {
    console.error(data);
  });

  command.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
} else {
  console.error(`process.env.NODE_ENV: ${process.env.NODE_ENV}\n`);
  console.error(
    "Hello anotaai developer. You are probably trying to run the ss-anotaai-front locally.\n :) Have a nice work!\n"
  );
}
