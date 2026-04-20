---
slug: /deploying/datadog
sidebar_label: Setting up Datadog
---

# Setting up Datadog

If you have access to Datadog for application monitoring and want to configure your HeadstartWP project to send data to Datadog, then this guide will help you get started. As of this writing, this guide is meant to assist you when running HeadstartWP in your own hosting infrastructure or on a hosting platform that offers Datadog APM. Adding basic Datadog support is extremely simple and only requires a couple of steps. Your hosting platform may have additional requirements so check with them to ensure you have configured everything properly.

The following steps will help you get Datadog tracing installed and activate:

### Add dd-trace
You must first add Datadog's dd-trace library to your project. How you do so depends on if you are using workspaces or not. In general, you add the dd-trace library in the usual way with:

```
npm install -s dd-trace
```

Modify this to add the `--workspace` option if you are using workspaces, adjusting the path to locate your project. The command will look similar to:

```
npm install -s --workspace @path/to/workspace dd-trace
```

You will find more detailed directions at [https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/)

### Activate dd-trace
Once dd-trace is added to your project you must activate it in the hosting environment. While you can activate dd-trace in code, you may find it easier to activate using an environment variable passed to the Node process. In addition to the usual set of [environment variables used to configure dd-trace](https://ddtrace.readthedocs.io/en/stable/configuration.html) you can tell the Node process itself to initialize dd-trace using an environment variable. How this variable is set depends on the hosting platform and your preferences.

The required environment variable to pass to the Node process is:

```
NODE_OPTIONS='--require dd-trace/init'
```

You can set this however you please but note that you _cannot_ set this using the .env file for your project. This file is loaded too late in the initialization process to take affect.
