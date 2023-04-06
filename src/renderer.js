const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const information2 = document.getElementById('env')
information2.innerText = `Host in env: (${envVars.host})`

const func = async () => {
  const response = await events.ping('this is a message')
  console.log(response)
}

func()