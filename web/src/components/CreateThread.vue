<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12" 
          >
          <v-text-field
            v-model="url"
            :rules="isUrl"
            label="Url"
            required></v-text-field>           
        </v-col>      
        <v-col
          cols="12"
          md="12" 
          >
          <v-text-field
            v-model="title"
            :rules="isTitle"
            label="Title"
            required></v-text-field>           
        </v-col>      
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
            @click="postThread"
            >
            Post
          </v-btn>
            <v-btn
              outlined
              color="green"
              v-if="link"
              @click="$router.push(`/thread/${link}`)">
              View Thread Here
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
      color=green>Thread Mined! :)</v-snackbar>
  </v-form>
</template>
<script>
import * as HCService from '@/shared/HCService.js'
export default {
  data: () => ({
    fail: false,
    success: false,
    valid: false,
    link: false,
    url: '',
    isUrl: [
      v => !!v || 'A url is required'
    ], 
    title: '',
    isTitle: [
      v => !!v || 'A title is required'
    ], 
    content: '',
    isContent: [
      v => !!v || 'some Content is required'
    ],
    mining: false
  }),
  methods: {
    async postThread() {
      if (this.valid) {
        this.mining = true;
        const threadTx = await HCService.createThread(
          this.$store.state.account,
          this.$store.state.contract,
          this.url,
          this.title,
          this.content
        );
        console.log('threadtx', threadTx)
        if (threadTx.transactionHash) {
          this.success = true
          this.link =  threadTx.events.Thread.returnValues.id
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

