<template>
 <v-container
	class="py-8 px-6"
	fluid
>
  <v-row
    justify="center"
    align="center">
     <v-col
       xs=11
       sm=10
       md=9
       lg=8
       xl=7
       justify="center"
       align="center">
       <v-card
         outlined
         class="pt-3"
         >
       <p class="display-1">{{title}}</p>
       <v-card-subtitle
         class="text-center">
         by: {{creator}}
       </v-card-subtitle>
       <v-divider></v-divider>
       <v-card-subtitle
         class="text-center">
         id: {{threadId}}
       </v-card-subtitle>
       </v-card>
     </v-col>
  </v-row>
  <v-row
    justify="center"
    align="center">
     <v-col
       xs=11
       sm=10
       md=9
       lg=8
       xl=7
       justify="left"
       align="left">
       <v-card
         outlined
         class="pa-4"
         >
       <v-card-title
         class="text-center">
         <a :href="'//' + url" target="_blank">
         {{url}}
         </a>
       </v-card-title>
       <div class="text--primary">{{content}}</div>

       </v-card>
     </v-col>
  </v-row>
  <v-row
    v-for="(comment, i) in comments"
    :key="i"
    justify="center"
    align="center">
     <v-col
       xs=11
       sm=10
       md=9
       lg=8
       xl=7
       justify="left"
       align="left">
       <v-card
         outlined
         class="pa-4"
         >
         <v-card-subtitle
           class="text-center">
           by: {{comment.creator}}
         </v-card-subtitle>
         <v-divider> </v-divider>
         <v-card-subtitle
           class="text-center">

           id: {{comment.id}}
         </v-card-subtitle>
       <div class="text--primary">{{comment.content}}</div>

       </v-card>
     </v-col>
  </v-row>
  <v-row
    justify="center"
    align="center">
     <v-col
       xs=11
       sm=10
       md=9
       lg=8
       xl=7
       justify="center"
       align="center">
      <v-btn
         outlined
         class="ma-2"
         color="green"
         @click="showCommentBox = !showCommentBox"
         >
         Comment
       </v-btn>
        <CreateComment
          :threadId="threadId"
          v-if="showCommentBox" />
      </v-col>
    </v-row>
</v-container>
</template>
<script>
import * as HCService from '@/shared/HCService.js'
import CreateComment from '@/components/CreateComment'

export default {
  components: {
    CreateComment
  },
  data: () => ({
    showCommentBox: false,
    threadId: null,
    title: null,
    content: null,
    creator: null,
    url: null,
		comments: []
  }),
  async created() {
    const thread = await HCService.getThread(this.$route.params.id)
    this.threadId = thread[0].id
    this.url = thread[0].url
    this.creator = thread[0].creator
    this.title = thread[0].title
    this.content = thread[0].content
    this.comments = thread[1]
    console.log(this.comments)
    const contract = await HCService.getInstance()
    await contract.events.Comment({
      fromBlock: 'earliest',
      filter: {threadId: this.threadId}
    }, (err, event) => {
      if (!err) {
        const comment = {
          content: event.returnValues.content,
          creator: event.returnValues.creator,
          id: event.returnValues.id,
          threadId: event.returnValues.threadId,
          replyId: event.returnValues.replyId
        }
        
        if (comment.replyId === '0x0000000000000000000000000000000000000000000000000000000000000000') {
          this.comments.push(comment)
        } else {
          const repliedTo = this.comments.find((oldComments) => {
            return oldComments.id === comment.replyId
          })
          console.log(repliedTo)
          console.log(this.comments[repliedTo])
        }
      } else {
        console.log(err)
      }
    })
      .on("connected", (subscriptionId) =>  {
        console.log('subid', subscriptionId)
      })
      .on("data", (event) =>  {
        console.log('data',event)
      })
      .on("changed", (event) => {
        console.log('changed', event)
      })
      .on("error", (error, receipt) => {
        console.log('error', error, receipt)
      })

  },
  methods: {
  }
}
</script>
