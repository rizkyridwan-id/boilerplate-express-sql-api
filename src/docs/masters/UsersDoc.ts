class UsersDoc {
  private tagName: any

  constructor(tageName: any) {
    this.tagName = tageName;
  }

  getDoc() {
    return {
      // Get User All
      "/user/get/all": {
        get: {
          tags: [this.tagName],
          description: "Get All User",
          operationId: "getUsers",
          responses: {}
        }
      },
    }
  }
}

export default UsersDoc;