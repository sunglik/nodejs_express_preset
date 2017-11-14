# nodejs_express_preset
express web server engine runtime by nodejs of preset to development environment

# Ready for your environment
1. Node.js (Javascript Runtime)
2. NPM (Node.js Management System)

# Recommend Text Editor
1. VSCode (Visual Studio Code)
2. Atom.io

# How to Set your Environment by npm build to 'express' workspace
1. Run Editor.
2. Open the terminal.
3. make project directory by own you.
  > mkdir express_app
4. npm initialize your project directory.
  > npm init
5. install build and run module your local area name of webpack, webpack-dev-server for dependency.
  > npm install -g babel webpack webpack-dev-server
6. and then install modules on your workspace ( cause you write sourcecode by javascript ).
  > npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015 webpack webpack-dev-server
7. install global dependency
  > npm install -g babel-cli nodemon cross-env
8. install express and body-parser
  > npm install --save express body-parser
  
# babel, react-hot-loader webpack.config.js (write type changed casue of version deprecate)
Before
---------
<pre><code>
module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            }
        ]
    }
</code></pre>
After
----------
<pre><code>
module: {
        loaders: [
            {
                test : /\.js$/,
                loader:'babel-loader',
                query:{
                  cacheDirectory :true,
                  presets : ['es2015', 'react'],
                  plugins: [
                    'react-hot-loader/babel'
                  ],
                },
                exclude : /node_modules/,
            }
        ]
    }
</code></pre>

# Bundle - We can make a project by easy and pretty method. What a perfect! 
  > create-react-app "express-app"
  
But, You will have a lot of dependencies, even they not used. you did planned on write React project.
Nevertheless, this is best one of make a project method.



# Writer
sungliky@gmail.com(sungliky@gmail.com)

# Reference
https://github.com/velopert/react-codelab-project

https://github.com/facebook/react

https://github.com/gaearon/react-hot-loader






