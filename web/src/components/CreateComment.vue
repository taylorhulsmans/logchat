<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12"
          >
          <v-textarea
            outlined
            :rules="isContent"
            v-model="content"
            name="Content"
            label="Content area"
            value="etch your message into the ethereum event logs"
            ></v-textarea>

          <v-btn
            :disabled="!valid"
            :loading="mining"
            color="success"
            class="mr-4"
            @click="postComment"
            >
            Post
          </v-btn>
        </v-col> 
      </v-row>		  
    </v-container>
    <v-snackbar
      v-model="fail"
      top
      color=red>
      An error Occurred in the Transaction :(
    </v-snackbar>
    <v-snackbar
      v-model="success"
      top
      color=green>Comment Mined! :)</v-snackbar>
  </v-form>
</template>
<script>
import * as HCService from '@/shared/HCService.js'
export default {
  props: {
    threadId: String,
    replyTo: String,
  },
  data: () => ({
    fail: false,
    success: false,
    valid: false,
    link: false,
    content: '',
    isContent: [
      v => !!v || 'some Content is required'
    ],
    mining: false
  }),
  methods: {
    async postComment() {
      if (this.valid) {
        this.mining = true;
        const commentTx = await HCService.createComment(
          this.threadId,
          this.replyTo ? this.replyTo : HCService.getBytes32FromString(''),
          this.content
        );
        console.log(commentTx)
        if (commentTx.transactionHash) {
          this.success = true
          this.link =  commentTx.events.Comment.returnValues.id
        } else {
          this.fail = true
        }
        this.mining = false
      } else {
        return
      }
    }, 
  }

}
</script>

