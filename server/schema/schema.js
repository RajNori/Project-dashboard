const User = require('../models/user')
const Project = require('../models/Project');
const Client = require('../models/Client');
const bcrypt = require('bcryptjs')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

//User
const userType = new GraphQLObjectType({
  name: 'User',
  fields:()=>({
    id: {type:GraphQLID},
    email:{type:GraphQLString},
    password:{type:GraphQLString},
  }),
})

//Client
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//Project
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //get all projects *** --->
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },

    //get all clients *** --->
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //ADD Client *** ---->
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
      // tested(manual test)... working
    },
    //DELETE client *** --->
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    // tested(manual test... working

    //ADD project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              start: {
                value: 'start',
              },
              planning: {
                value: 'Planning',
              },
              ux: {
                value: 'ux',
              },
              content: {
                value: 'content',
              },
              code: {
                value: 'code',
              },
              qa: {
                value: 'qa',
              },
              launch: {
                value: 'launch',
              },
            },
          }),
          defaultValue: 'start',
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
      //tested (manual test) working ** --->
    },
    //Delete project
    deleteProject: {
      type: ProjectType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    //update
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString},
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              start: {
                value: 'start',
              },
              planning: {
                value: 'planning',
              },
              ux: {
                value: 'ux',
              },
              content: {
                value: 'content',
              },
              code: {
                value: 'code',
              },
              qa: {
                value: 'qa',
              },
              launch: {
                value: 'launch',
              },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
            args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
          //tested (manual test) -> passed > *** 
        );
      },
    },
  },
});
//Tested for CRUD operations. 
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
