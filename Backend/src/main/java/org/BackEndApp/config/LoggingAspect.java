//package org.BackEndApp.config;
//
//import lombok.extern.slf4j.Slf4j;
//import org.aspectj.lang.*;
//import org.aspectj.lang.annotation.*;
//import org.springframework.stereotype.Component;
//@Aspect
//@Component
//@Slf4j
//public class LoggingAspect {
//
//    // Only log classes annotated with @Service, @Component, or @Controller
//    @Pointcut("within(@org.springframework.stereotype.Service *) || " +
//            "within(@org.springframework.stereotype.Component *) || " +
//            "within(@org.springframework.stereotype.Controller *) || " +
//            "within(@org.springframework.web.bind.annotation.RestController *)")
//    public void onlyMyAnnotatedBeans() {}
//
//    @Before("onlyMyAnnotatedBeans()")
//    public void logBefore(JoinPoint joinPoint) {
//        log.info("🔷 Entering: {} | Args: {}", joinPoint.getSignature(), joinPoint.getArgs());
//    }
//
//    @AfterReturning(pointcut = "onlyMyAnnotatedBeans()", returning = "result")
//    public void logAfterReturning(JoinPoint joinPoint, Object result) {
//        log.info("✅ Returned from: {} | Result: {}", joinPoint.getSignature(), result);
//    }
//
//    @AfterThrowing(pointcut = "onlyMyAnnotatedBeans()", throwing = "ex")
//    public void logAfterThrowing(JoinPoint joinPoint, Throwable ex) {
//        log.error("❌ Exception in: {} | Message: {}", joinPoint.getSignature(), ex.getMessage());
//    }
//
//    @Around("onlyMyAnnotatedBeans()")
//    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
//        long start = System.currentTimeMillis();
//        Object proceed = joinPoint.proceed();
//        long end = System.currentTimeMillis();
//        log.info("⏱️ Executed: {} | Time: {} ms", joinPoint.getSignature(), (end - start));
//        return proceed;
//    }
//}
