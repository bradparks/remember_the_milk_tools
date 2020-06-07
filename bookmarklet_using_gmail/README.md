This lets you send tasks to yourself using a bookmarklet that [uses Gmail, as detailed in this guys blog post](https://gsuitetips.com/tips/gmail/use-a-bookmark-to-send-a-customised-gmail-message/) and uses the [RTM for Email feature](https://www.rememberthemilk.com/services/email/).
The body of the email can include multiple tasks, one per line, but must follow the [details laid out here at RTM for Smart Add](https://www.rememberthemilk.com/help/answer/basics-smartadd-howdoiuse)

##Here's how to make it work:
- Edit the [bookmarklet.js](./bookmarklet.js) file.
- At the top of the file, change the following to the email from your RTM at [this page](https://www.rememberthemilk.com/app/#settings/email), and the list you want it to go to.
<pre>
  var YOUR_RTM_EMAIL = "";
  var YOUR_LIST = "Inbox";
</pre>
- Copy the contents of the bookmarklet.js file to your clipboard, and then go [here](https://www.yourjs.com/bookmarklet/), and convert the javascript into a bookmarklet following their instructions.
- To change the list, once the Gmail form pops up, just change the subject to the name of the list you'd like it to use!
