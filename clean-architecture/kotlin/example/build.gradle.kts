import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.6.20"
    kotlin("plugin.jpa") version "1.6.10"
    kotlin("plugin.spring") version "1.6.10"

    id("org.springframework.boot") version "2.3.1.RELEASE"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    application

}

group = "com.cleanarchitecture"
version = "1.0-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11


repositories {
    mavenCentral()
}

dependencies {
    implementation("org.valiktor:valiktor-core:0.12.0")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")

    implementation("javax.activation:activation:1.1.1")
    implementation("org.springframework.boot:spring-boot-starter-validation")



    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("io.mockk:mockk:1.12.2")
    testImplementation("org.amshove.kluent:kluent:1.68")
    testImplementation("org.junit.jupiter:junit-jupiter-api")
    testImplementation("org.mock-server:mockserver-client-java:5.11.2")
    testImplementation("org.mock-server:mockserver-netty:5.11.2")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "junit", module = "junit")
    }
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")




}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

application {
    mainClass.set("MainKt")
}
