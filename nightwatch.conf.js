module.exports = {
  src_folders: ['test'],


  webdriver: {
   "start_process": true,
        "server_path": "",
        "port":9515
      },
   
    "test_settings": {
      "default" : {
        
      "desiredCapabilities": {
        "browserName": "chrome"
      },
      "skip_testcases_on_fail":false
    }
  }
}
