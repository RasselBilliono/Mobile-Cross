import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.9.24"
    id("java-gradle-plugin")
    // Add the dependency for the Google services Gradle plugin
}

repositories {
    mavenCentral()
}

gradlePlugin {
    plugins {
        create("reactSettingsPlugin") {
            id = "com.facebook.react.settings"
            implementationClass = "expo.plugins.ReactSettingsPlugin"
        }
    }
}
