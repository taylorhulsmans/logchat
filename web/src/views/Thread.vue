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
         <a :href="genUrl(url)" target="_blank">
         {{url}}
         </a>
       </v-card-title>
       <div class="pa-3 text--primary">{{content}}</div>
       <v-divider></v-divider>
       <br />
       <v-row
         v-for="(comment, i) in comments.filter((comment) => {
         return comment.replyId ==='0x0000000000000000000000000000000000000000000000000000000000000000'
         })"
         :key="i">
         <v-col
           class="pa-0"
           @click="jumpTo(comment.id)"
           >
           <p class="pa-0 ma-0 blue--text text-decoration-underline">>>{{comment.id}}</p>
         </v-col>
       </v-row>
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
         <v-card-subtitle
           class="text-center">
           Replying To: {{comment.replyId}}
         </v-card-subtitle>
         <v-divider> </v-divider>
       <div 
          :ref="comment.id"
         class="pa-3 text--primary">{{comment.content}}</div>
       <v-divider
         ></v-divider>
       <br />
       <v-row
         v-for="(reply, i) in comments.filter((com) => {
         return com.replyId === comment.id
         })"
         :key="i">
         <v-col
           class="pa-0"
           @click="jumpTo(comment.id)"
           >
           <p class="pa-0 ma-0 blue--text text-decoration-underline">>>{{reply.id}}</p>
         </v-col>
       </v-row>
       <br />
       <v-divider></v-divider>
       <v-card-actions>
         <v-btn
           outlined
           @click="comment.showReplyBox = !comment.showReplyBox"
           class="ma-2"
           color="green">
           Reply
         </v-btn>
       </v-card-actions>
         <CreateComment
           v-if="comment.showReplyBox"
           :threadId="threadId"
           :replyId="comment.id" />

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
    showReplyBox: false,
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

    this.comments = thread[1].map((com) => {
      com.showReplyBox = false
      return com
    })
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
          replyId: event.returnValues.replyId,
          showReplyBox: false
        }
          this.comments.push(comment)
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
    jumpTo(commentId) {
      const element = this.$refs[commentId]
      element[0].scrollIntoView({behavior: "smooth"})
  },
    genUrl(url) {
      console.log(url)
      if (/^http/.test(url)) {
        return url
      } else 
      return '//' + url
    }
  }
}
</script>
